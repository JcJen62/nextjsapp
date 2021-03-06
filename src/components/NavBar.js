import { Amplify, DataStore } from 'aws-amplify'
import config from '../aws-exports'
import * as React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import AnimeDialog from './AnimeDialog'
import { Anime } from '../models'

Amplify.configure(config)

const NavBar = ({ signOut }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [fetchedAnime, setFetchedAnime] = React.useState({})
    const [searchTerms, setUserInput] = React.useState("")
    const [dialog, setDialog] = React.useState({
        isOpen: false,
        anime: undefined,
    })

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }


    const handleSignOut = () => {
        DataStore.clear()
        signOut()
    }

    const handleSearch = async () => {
        if (!searchTerms) return
        const jikanAnime = await fetch('/api/anime', {
            method: 'POST',
            body: JSON.stringify({ id: searchTerms }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        setFetchedAnime(await jikanAnime.json())

        setDialog({
            isOpen: true,
            anime: fetchedAnime,
        })
    }

    const handleSaveAnime = async () => {
        try {
            await DataStore.save(
                new Anime({
                    mal_id: fetchedAnime.mal_id,
                    image_url: fetchedAnime.image_url,
                    title: fetchedAnime.title,
                    title_english: fetchedAnime.title_english,
                    episodes: fetchedAnime.episodes,
                    synopsis: fetchedAnime.synopsis,
                    score: fetchedAnime.score,
                    rank: fetchedAnime.rank,
                    background: fetchedAnime.background,
                }),
            )
            console.log('Anime was saved!')
        } catch (err) {
            console.log('Save anime error ', err)
        } finally {
            setDialog({
                isOpen: false,
            })
        }
    }

    const handleCloseDialog = () => {
        setDialog({
            isOpen: false
        })
    }

    return (
        <>
            <AppBar position='static' id='navBar'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title='Anime To Watch'>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Link href="/animes">Animes</Link>
                                </Button>
                            </Tooltip>
                        </Box>

                        <Box>
                            <IconButton onClick={handleSearch}>
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <TextField
                                size="small"
                                label="Search By Id"
                                variant="outlined"
                                onChange={handleChange}
                                onKeyUp={handleKeyUp}
                                value={searchTerms}
                                sx={{ backgroundColor: 'white', flexGrow: 2, mr: 20, borderRadius: '5px' }}
                            />
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt='Jeremy Jensen'
                                        src='Jeremy.jpg'
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Account</MenuItem>
                                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <AnimeDialog open={dialog.isOpen} anime={fetchedAnime} onClose={handleCloseDialog} onSaveAnime={handleSaveAnime} />
        </>
    )
}
export default NavBar