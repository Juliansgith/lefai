import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Grid, Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // To support GitHub Flavored Markdown like bold, italic, tables, etc.

const Vaardigheden = () => {
  const [vaardighedenData, setVaardighedenData] = useState({});
  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/vaardigheden-nl.json`)
      .then((response) => response.json())
      .then((data) => setVaardighedenData(data))
      .catch((error) => console.error('Error fetching vaardigheden data:', error));
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Vaardigheden</Typography>
        <Typography variant="body2" gutterBottom>Alle skills die je moet ontwikkelen binnen Open-ICT</Typography>
        <Grid container spacing={2}>
          {Object.keys(vaardighedenData).map((skill, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant={selectedSkill === skill ? 'contained' : 'outlined'}
                onClick={() => setSelectedSkill(skill)}
                fullWidth
                sx={{ textTransform: 'none', fontSize: '1rem' }}
              >
                {skill}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        {selectedSkill && vaardighedenData[selectedSkill] && (
          <Box>
            <Typography variant="h6" gutterBottom>{selectedSkill}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {Object.entries(vaardighedenData[selectedSkill]).map(([level, details], index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 2, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      backgroundColor: '#1e1e1e', 
                      color: '#fff',
                      borderRadius: 2, 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', mb: 1 }}>
                      {`Niveau ${level}`}
                    </Typography>
                    <ReactMarkdown
                      children={details.title}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => <Typography variant="body2" sx={{ fontSize: '1rem', lineHeight: 1.5 }} {...props} />,
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Vaardigheden;
