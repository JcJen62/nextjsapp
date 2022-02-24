import Amplify, { API } from 'aws-amplify'
import * as React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { getAnimeById } from '../utils/api-util'
import { createAnime } from '../graphql/mutations'
import AnimeDialog from './AnimeDialog'

Amplify.configure({
    aws_project_region: process.env.aws_project_region,
    aws_appsync_graphqlEndpoint: process.env.aws_appsync_graphqlEndpoint,
    aws_appsync_region: process.env.aws_appsync_region,
    aws_appsync_authenticationType: process.env.aws_appsync_authenticationType,
    aws_appsync_apiKey: process.env.aws_appsync_apiKey,
})

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const NavBar = () => {
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

    const handleSearch = async () => {
        const jikanAnime = await getAnimeById(searchTerms)
        setFetchedAnime(jikanAnime)
        setDialog({
            isOpen: true,
            anime: fetchedAnime,
        })
    }

    const handleSaveAnime = async () => {
        const newAnime = {
            mal_id: fetchedAnime.mal_id,
            image_url: fetchedAnime.image_url,
            title: fetchedAnime.title,
            title_english: fetchedAnime.title_english,
            episodes: fetchedAnime.episodes,
            synopsis: fetchedAnime.synopsis,
            score: fetchedAnime.score,
            rank: fetchedAnime.rank,
            background: fetchedAnime.background,
        }
        try {
            const response = await API.graphql({
                query: createAnime,
                variables: { input: newAnime },
                authMode: process.env.aws_appsync_authenticationType
            })
            console.log('Success')
        } catch (err) {
            console.log("Save error ", err)
        } finally {
            setDialog({
                isOpen: false
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
        <AppBar position='static'>
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
                            <SearchIcon />
                        </IconButton>
                        <TextField
                            size="small"
                            label="Search"
                            variant="outlined"
                            onChange={handleChange}
                            value={searchTerms}
                            sx={{ backgroundColor: 'white', flexGrow: 2, mr: 20 }}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt='Jeremy Jensen'
                                    src='/static/images/Jeremy.jpg'
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
                            {settings.map((setting) => (
                                <MenuItem key={setting}>
                                    <Typography textAlign='center'>{setting}</Typography>
                                </MenuItem>
                            ))}
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