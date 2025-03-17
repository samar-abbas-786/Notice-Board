import Favourite from "../model/favouriteSchema";
import Notice from "../model/noticeSchema";
import User from "../model/userSchema";

export const createFavourite = async (req, res) => {
  const { savedBy, savedNotice } = req.body;
  if (!savedBy || !savedNotice) {
    return res.status(400).json({ message: "No Favourite Notice Found" });
  }
  const favNotice = await Notice.create({ savedBy, savedNotice });
  return res.status(200).json({ message: "Added to Favourite", favNotice});
};

export const getFavourite = async (req, res) => {
  try {
    const { savedBy } = req.query;

    const user = await User.findById(savedBy);
    if (!user) {
      return res.status(400).json({ message: "You need to be logged in" });
    }

    const FavNotices = await Favourite.find({ savedBy });
    if (FavNotices.length === 0) {
      return res.status(400).json({ message: "No Favourite Found" });
    }

    const notices = await Promise.all(
      FavNotices.map(async (item) => {
        return await Notice.findById(item.savedNotice);
      })
    );

    return res.status(200).json({ favourites: notices });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
