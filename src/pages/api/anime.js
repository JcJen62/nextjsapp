// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const id = req.body.id

    const response = await fetch(
      `https://api.jikan.moe/v3/anime/${id}`
    )

    const animeData = await response.json()

    res.status(200).json(animeData)
  }
}