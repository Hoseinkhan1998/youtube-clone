import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const { id } = useParams();

  // useEffect(() => {
  //   fetchFromAPI(`channels?part=snippet&id=${id}`)
  //     .then((data) => setChannelDetail(data?.item[0]));

  //   fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
  //     .then((data) => setVideos(data?.items));
  // }, [id])

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);


  return (
    <Box minHeight='95vh'>
      <Box>
      <div style={{
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(82,221,57,0.8127626050420168) 42%, rgba(89,115,95,1) 57%)',
        zIndex: 10, height: '300px'
      }}
      />
      <ChannelCard channelDetail={channelDetail}  marginTop= '-110px' />
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr: {sm: '100px'}}}/>
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail