import React, { useState, useEffect } from 'react';
import { parseJsonData, getDetailsForSelection } from '../helpers/jsonHelper';
import { Box, Button, Typography, Paper, Grid, Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const HBOIComponent = () => {
    const [jsonData, setJsonData] = useState({});
    const [parsedData, setParsedData] = useState({});
    const [selectedArchitecture, setSelectedArchitecture] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');

    // Fetch JSON data and parse it on component mount
    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/hboi-nl.json`)
            .then((response) => response.json())
            .then((data) => {
                setJsonData(data);
                setParsedData(parseJsonData(data));
            })
            .catch((error) => console.error('Error fetching JSON data:', error));
    }, []);

    const handleArchitectureClick = (architecture) => {
        setSelectedArchitecture(architecture);
        setSelectedActivity(''); // Reset activity when architecture changes
    };

    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    {/* Architectuurlagen Section */}
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Architectuurlagen</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {Object.keys(parsedData).map((architecture) => (
                                <Button
                                    key={architecture}
                                    variant={selectedArchitecture === architecture ? 'contained' : 'outlined'}
                                    onClick={() => handleArchitectureClick(architecture)}
                                    fullWidth
                                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                                >
                                    {architecture}
                                </Button>
                            ))}
                        </Box>
                    </Grid>

                    {/* Activiteiten Section */}
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Activiteiten</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {selectedArchitecture && parsedData[selectedArchitecture].map((activity) => (
                                <Button
                                    key={activity}
                                    variant={selectedActivity === activity ? 'contained' : 'outlined'}
                                    onClick={() => handleActivityClick(activity)}
                                    fullWidth
                                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                                >
                                    {activity}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Display Content Based on Selection */}
            <Box sx={{ mt: 4 }}>
                {selectedArchitecture && selectedActivity && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {`${selectedArchitecture} ${selectedActivity}`}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {Object.entries(getDetailsForSelection(jsonData, selectedArchitecture, selectedActivity)).map(([level, { title }]) => (
                                <Grid item xs={12} sm={6} key={level}>
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
                                            children={title}
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

export default HBOIComponent;
