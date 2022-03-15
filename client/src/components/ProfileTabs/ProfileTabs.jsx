import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tweet from "../Tweet/Tweet";
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";
import {useFetch} from "../../hooks/useFetch";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({userId}) {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log(userId)

    const useStyles = makeStyles({
        scrollComponent: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch"
        },
    });

    const user = useSelector(state => state.auth.user);
    const classes = useStyles();
    const [view, setView] = useState(0);
    // const [posts, setPosts] = useState([]);
    const defaultLimit = 6;

    // async function fetchPosts() {
    //     const ownPosts = await api.get(userId ? `/post/byId/${userId}?page=${view}&size=${defaultLimit}` : `/post/by-auth?page=${view}&size=${defaultLimit}`)
    //     setPosts([ ...ownPosts]);
    // }


    const [{data: posts}, getData] = useFetch({
        url: userId ? `/post/byId/${userId}?page=${view}&size=${defaultLimit}` : `/post/by-auth?page=${view}&size=${defaultLimit}`,
        method: 'GET',
        initData: {
            list: [],
            total: 0
        }
    })

    const [{data: commentedPosts}, getCommentedData] = useFetch({
        url: `/post/commented?page=${view}&size=${defaultLimit}`,
        method: 'GET',
        initData: {
            list: [],
            total: 0
        }
    })

    useEffect(() => {
        getData();
        getCommentedData();
    }, [view])

    const postsList = posts.list;
    const commentedPostsList = commentedPosts.list;

    const postList = useSelector(state => state.post.postsList);

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Tweets" {...a11yProps(0)} />
                    <Tab label="Replies" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box className={classes.scrollComponent} dataLength={posts.length}
                     next={() => setView(view + 1)} hasMore={true} loader={null}>
                    {/*{postsList.map(p => <Tweet key={p.id} body={p.body} data={p} likes={p.likes} imgTwitUrl={p.imgTwitUrl}*/}
                    {/*                           avatarUserUrl={p.user.avatarUrl}/>)}*/}
                    {postList
                        .sort(function (a, b) {

                            return new Date(b.createdDate) - new Date(a.createdDate);
                        })
                        .map(p => <Tweet key={p.id} body={p.body} data={p} likes={p.likes} imgTwitUrl={p.imgTwitUrl}
                                         avatarUserUrl={p.user.avatarUrl}/>)}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box className={classes.scrollComponent} dataLength={posts.length}
                     next={() => setView(view + 1)} hasMore={true} loader={null}>

                    {commentedPostsList.map(p => <Tweet key={p.id} body={p.body} data={p} likes={p.likes}
                                                        imgTwitUrl={p.imgTwitUrl}
                                                        avatarUserUrl={p.user.avatarUrl}/>)}
                </Box>
            </TabPanel>
        </Box>
    );
}