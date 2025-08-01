import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Box, Grid } from '@mui/material';

const EditProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || 'Failed to fetch project');
        }
        const { data } = await res.json();
        setName(data.name);
        setDescription(data.description);
        setStatus(data.status);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
      }
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, status }),
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to update project');
      }
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>Edit Project</Typography>
      {error && <Typography color="error">Error: {error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Update Project</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProject;