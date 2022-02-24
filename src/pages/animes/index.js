import Amplify, { API } from "aws-amplify"
// import config from '../../aws-exports'
import NavBar from "../../components/NavBar"
import { Box, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { listAnime } from "../../graphql/queries"

// Amplify.configure(config)

Amplify.configure({
    aws_project_region: process.env.aws_project_region,
    aws_appsync_graphqlEndpoint: process.env.aws_appsync_graphqlEndpoint,
    aws_appsync_region: process.env.aws_appsync_region,
    aws_appsync_authenticationType: process.env.aws_appsync_authenticationType,
    aws_appsync_apiKey: process.env.aws_appsync_apiKey,
})

// 2. Nextjs will execute this component function AFTER getStaticProps
const MyAnimeList = (props) => {

    const { animeList } = props

    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {animeList.map((anime) => (
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

                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    )
}

// 1. Nextjs will execute this function first.  It is never visible to the client!
export async function getStaticProps() {
    let animeList = []
    try {
        const response = await API.graphql({
            query: listAnime,
            authMode: 'API_KEY'
        })
        animeList = response.data.listAnime.items

    } catch (err) {
        console.log("Retrieve anime list error", err)
    }
    return {
        props: {
            animeList: animeList
        },
        revalidate: 10
    }
}

export default MyAnimeList