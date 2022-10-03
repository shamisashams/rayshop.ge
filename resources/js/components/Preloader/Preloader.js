import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Preloader.css";

const imgs = [
    "/assets/images/preloader/1.png",
    "/assets/images/preloader/2.png",
    "/assets/images/preloader/3.png",
    "/assets/images/preloader/4.png",
    "/assets/images/preloader/1.png",
    "/assets/images/preloader/2.png",
    "/assets/images/preloader/3.png",
    "/assets/images/preloader/4.png",
    "/assets/images/preloader/1.png",
    "/assets/images/preloader/2.png",
    "/assets/images/preloader/3.png",
    "/assets/images/preloader/4.png",
    "/assets/images/preloader/1.png",
    "/assets/images/preloader/2.png",
    "/assets/images/preloader/3.png",
    "/assets/images/preloader/4.png",
    "/assets/images/preloader/1.png",
    "/assets/images/preloader/2.png",
    "/assets/images/preloader/3.png",
    "/assets/images/preloader/4.png",
    "/assets/images/preloader/1.png",
    "/assets/images/preloader/2.png",
    "/assets/images/preloader/3.png",
    "/assets/images/preloader/4.png",
];


export default function LinearWithValueLabel({ loading }) {
    function LinearProgressWithLabel(props) {
        return (
            <Box className="progress">
                <Box sx={{ minWidth: 35 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >{`${Math.round(props.value)}%`}</Typography>
                </Box>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
            </Box>
        );
    }

    LinearProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate and buffer variants.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
    };
    const [progress, setProgress] = useState(0);
    const [progressRail, setProgressRail] = useState("0");

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 1
            );
        }, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setProgressRail("-4000px");
    }, []);

    return (
        <div className={`preloader ${loading ? "" : "hide"}`}>
            <div className="container">
                <div className="imgSlide">
                    <div
                        className="imgSlideRail "
                        style={{ left: progressRail }}
                    >
                        {imgs.map((img, index) => {
                            return <img key={index} src={img} alt="" />;
                        })}
                    </div>
                </div>
                <div className="mb-6">საიტი იტვირთება</div>
                <Box sx={{ width: "100%" }}>
                    <LinearProgressWithLabel value={progress} />
                </Box>
            </div>
        </div>
    );
}
