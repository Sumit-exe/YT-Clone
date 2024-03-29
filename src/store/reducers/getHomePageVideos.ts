import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { parseData } from "../../utils";
import axios from 'axios'
import { HomePageVideos } from "../../Types";

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "youtubeApp/homePageVideos",
    async (isNext:boolean,{getState})=>{
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos} 
        } = getState() as RootState;
        const { data:{items,nextPageToken}} = await axios.get(`${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`)
        
        const parsedData: HomePageVideos[] = await parseData(items)
        return {parseData:[...videos, ...parsedData],nextPageToken}
    }
    )