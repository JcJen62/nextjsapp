import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    Typography,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const AnimeDialog = (props) => {
    const { open, anime, onSaveAnime, onClose } = props

    return (
        <Dialog maxWidth="sm" open={open} onClose={onClose} scroll='paper'>
            <DialogContent sx={{ m: 0 }}>
                <Card key={anime.mal_id} sx={{ maxWidth: 300 }}>
                    <CardMedia component="img" image={anime.image_url} title={anime.title_english} />
                    <CardContent>
                        <Box>
                            <Typography variant="subtitle1" color="textSecondary">
                                Rank: {anime.rank}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Score: {anime.score}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                Synopsis: {anime.synopsis}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <IconButton aria-label="save anime" onClick={onSaveAnime}>
                    <LibraryAddIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}

export default AnimeDialog