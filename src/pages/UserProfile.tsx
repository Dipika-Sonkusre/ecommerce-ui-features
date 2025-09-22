import { useEffect } from "react";

import { getCurrentUser } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { ApiEndpoint } from "../enum";

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { userProfile, isLoading } = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getCurrentUser({ accessToken }));
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userProfile) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card elevation={4} sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={userProfile?.image}
            alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {userProfile?.firstName} {userProfile?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{userProfile?.username}
          </Typography>
        </Box>

        <CardContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Age
              </Typography>
              <Typography>{userProfile?.age}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Gender
              </Typography>
              <Typography>{userProfile?.gender}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography>{userProfile?.email}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography>{userProfile?.phone}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Blood Group
              </Typography>
              <Typography>{userProfile?.bloodGroup}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Birth Date
              </Typography>
              <Typography>
                {new Date(userProfile?.birthDate).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Height
              </Typography>
              <Typography>{userProfile?.height} cm</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Weight
              </Typography>
              <Typography>{userProfile?.weight} kg</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions
          sx={{
            float: "right",
          }}
        >
          <Button
            onClick={() => navigate(ApiEndpoint.HOME)}
            variant="contained"
            style={{
              backgroundColor: "ActiveCaption",
              textTransform: "capitalize",
            }}
          >
            Back To Home
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
