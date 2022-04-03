import { Amplify, DataStore } from "aws-amplify"
import useSWR from "swr";
import { Anime } from "../../models"
import config from "../../aws-exports"
import { Box, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react'

Amplify.configure(config)

// 2. Nextjs will execute this component function AFTER getStaticProps
const MyAnimeList = () => {

    const [animeList, setAnimeList] = React.useState([])

    const handleDeleteAnime = async (anime) => {
        try {
          const animeToDelete = await DataStore.query(Anime, anime.id)
          await DataStore.delete(animeToDelete)
        } catch (err) {
          console.log("Delete error: ", err)
        }
      }

      const fetcher = async () => {
        try {
          let tempList = await DataStore.query(Anime)
          setAnimeList(tempList)
        } catch (err) {
          console.log('Retrieve anime list error', err)
        }
        return animeList
      }
    
      const { data, error } = useSWR('/animes', fetcher, {
        refreshInterval: 500
      })
    
      if (error) return <div>Failed to load list of animes.</div>
      if (!data) return <div>Loading...</div>

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {animeList && animeList.map((anime) => (
                    <Card key={anime.id} sx={{ maxWidth: 300, m: 1 }}>
                        <CardMedia component='img' image={anime.image_url} height='300' />
                        <CardContent >
                            <Box>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Rank: {anime.rank}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Score: {anime.score}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    title: {anime.title_english}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>

                        <IconButton aria-label="delete" onClick={() => handleDeleteAnime(anime)}>
                            <DeleteIcon />
                        </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    )
}

export default MyAnimeList