// pages/Vaardigheden.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MarkdownContent from '../components/MarkdownContent';

const Vaardigheden = () => {
  const [vaardighedenData, setVaardighedenData] = useState({});
  const [selectedSkill, setSelectedSkill] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/vaardigheden-nl.json`)
      .then((response) => response.json())
      .then((data) => setVaardighedenData(data))
      .catch((error) => console.error('Error fetching vaardigheden data:', error));
  }, []);

  return (
    <Container sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Vaardigheden
        </Typography>
        <Typography variant="body2" gutterBottom>
          Alle skills die je moet ontwikkelen binnen Open-ICT
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(vaardighedenData).map((skill, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Button
                variant={selectedSkill === skill ? 'contained' : 'outlined'}
                onClick={() => setSelectedSkill(skill)}
                fullWidth
              >
                {skill}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {selectedSkill && vaardighedenData[selectedSkill] && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {selectedSkill}
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(vaardighedenData[selectedSkill]).map(([level, details], index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {`Niveau ${level}`}
                  </Typography>
                  <MarkdownContent content={details.title} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Vaardigheden;
