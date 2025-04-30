import { Button, ButtonGroup, Container, Stack, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PageNotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <ErrorOutlineIcon fontSize="large" color="error" />
        <Typography variant="h3" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The url you have requested is not found.
        </Typography>
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Take me home
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
};

export default PageNotFound;
