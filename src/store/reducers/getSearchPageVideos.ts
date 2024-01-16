import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { parseData } from "../../utils";
import axios from 'axios'
import { HomePageVideos } from "../../Types";

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
    "youtubeApp/searchPageVideos",
    async (isNext:boolean,{getState})=>{
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos ,searchTerm} 
        } = getState() as RootState;
        const { data:{items,nextPageToken}} = await axios.get(
            `${YOUTUBE_API_URL}/search?&q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`
            )
        
        const parsedData: HomePageVideos[] = await parseData(items)
        return {parseData:[...videos, ...parsedData],nextPageToken}
    }
    )