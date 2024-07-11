import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  const handleRegister = ()=>{
    navigate('/register');
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Forum Chat App
          </Typography>
          <Button color="inherit" onClick={handleRegister}>
            Register
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Forum Chat Application!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here you can join different forums, participate in discussions, and
            connect with others.
          </Typography>
          <List>
            <ListItem button onClick={() => navigate('/forum/1')}>
              <ListItemText primary="Forum 1" />
            </ListItem>
            <ListItem button onClick={() => navigate('/forum/2')}>
              <ListItemText primary="Forum 2" />
            </ListItem>
            {/* Add more forums as needed */}
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
