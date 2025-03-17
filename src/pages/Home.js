import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountUp from "react-countup";

const Home = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [totalTrees, setTotalTrees] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [amountUsed, setAmountUsed] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/donations/donation-stats`);
        const { totalTrees, totalDonation, amountUsed, remainingAmount } = response.data;

        setTotalTrees(totalTrees);
        setTotalDonation(totalDonation);
        setAmountUsed(amountUsed);
        setRemainingAmount(remainingAmount);
      } catch (error) {
        console.error("Error fetching donation stats:", error);
      }
    };

    fetchDonationStats();
  }, []);

  const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <>
      {/* 🌿 Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('images/img1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "white",
          px: 3,
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          🌍 Plant a Tree, Save the Future
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Every small contribution makes a **big impact**. Join us in making the world greener! 🌱
        </Typography>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/donate"
          sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.2rem" }}
        >
          Donate Now 🌳
        </Button>
      </Box>

      {/* 🌿 Impact Section */}
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Image Carousel */}
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", height: 350 }}>
              <Slider {...settings}>
                {images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </Box>
          </Grid>

          {/* Right Side - Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: "#f4f8ff",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#2E7D32" }}>
                🌱 Be Part of the Green Revolution!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                Your small act can make **a big change** in the environment.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/donate"
                sx={{ mt: 2, backgroundColor: "#4CAF50" }}
              >
                Donate Today 💚
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* 🌿 Donation Statistics Cards */}
        <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
          {[
            { label: "Total Trees Planted", value: totalTrees },
            { label: "Total Donation", value: totalDonation, prefix: "₹" },
            { label: "Amount Used", value: amountUsed, prefix: "₹" },
            { label: "Remaining Amount", value: remainingAmount, prefix: "₹" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={4}
                sx={{
                  backgroundColor: "#E8F5E9",
                  borderRadius: 3,
                  minHeight: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ color: "#1B5E20", fontWeight: "bold" }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                    <CountUp start={0} end={item.value} duration={2.5} separator="," prefix={item.prefix || ""} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 🌿 Our Mission */}
        <Paper sx={{ p: 5, mt: 5, backgroundColor: "#F9FBE7" }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ color: "#6D4C41" }}>
            🌏 Our Mission: A Greener Tomorrow
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
            We aim to plant **one million trees** by 2030! 🌱 Join hands with us in creating a healthier planet.
          </Typography>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button variant="contained" color="secondary" component={Link} to="/about">
              Learn More 📖
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Home;
