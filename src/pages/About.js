import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import CountUp from "react-countup";


const About = () => {
  return (
    <>
      {/* 🌿 Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('images/img3.jpg')`,// mission images
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
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
          🌎 Our Mission: A Greener Future
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          We are committed to planting **one million trees** by 2030! 🌱  
          Join us in making a sustainable impact on the environment.  
        </Typography>
      </Box>

      <Container sx={{ mt: 5 }}>
        {/* 🌿 Our Impact Section */}
        <Typography variant="h3" fontWeight="bold" textAlign="center" sx={{ color: "#2E7D32" }}>
          Our Impact
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4, textAlign: "center" }}>
          {[
            { label: "Trees Planted", value: 2 },
            { label: "Donors Contributed", value: 100 },
            { label: "Regions Covered", value: 1 },
            { label: "Years of Work", value: 0 },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={4} sx={{ p: 3, borderRadius: 3, backgroundColor: "#E8F5E9" }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#1B5E20" }}>
                  <CountUp start={0} end={item.value} duration={2.5} separator="," />
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>{item.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 🌿 Why Choose Us */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" sx={{ color: "#4CAF50" }}>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              { title: "Eco-Friendly Approach", desc: "We plant trees in the most sustainable way." },
              { title: "Transparent Donations", desc: "Every donation is tracked and used effectively." },
              { title: "Community Driven", desc: "We work with locals to ensure long-term impact." },
              { title: "Proven Results", desc: "Over 50,000 trees planted and counting!" },
            ].map((point, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ color: "#388E3C" }}>
                    {point.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>{point.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

   {/* 🌿 Meet Our Team */}
{/* <Box sx={{ mt: 6, textAlign: "center" }}>
  <Typography variant="h3" fontWeight="bold" sx={{ color: "#6D4C41" }}>
    Meet Our Team
  </Typography>
  <Grid container spacing={4} sx={{ mt: 4, justifyContent: "center" }}>
    {[
      { name: "Gajendra Gangwar", role: "Founder & CEO", image: '/assets/team3.jpg' },
      { name: "John Doe", role: "Operations Manager", image: '/assets/team1.jpg' },
      { name: "Alice Brown", role: "Head of Outreach", image: '/assets/team2.jpg' },
    ].map((member, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card elevation={3} sx={{ 
          borderRadius: 3, 
          textAlign: "center", 
          display: "flex", 
          flexDirection: "column", 
          height: "100%"
        }}>
          <Box sx={{ width: "100%", height: 250, overflow: "hidden" }}>
            <img 
              src={member.image} 
              alt={member.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold">{member.name}</Typography>
            <Typography variant="body1" color="textSecondary">{member.role}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box> */}

        {/* 🌿 Call to Action */}
        <Box sx={{ textAlign: "center", mt: 6, mb: 6 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#2E7D32" }}>
            Join Us in Making a Difference!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your support helps us plant more trees and create a greener planet. Every contribution counts!
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
      </Container>
    </>
  );
};

export default About;
