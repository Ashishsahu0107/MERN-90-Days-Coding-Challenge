// src/components/TodoForm.jsx
import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Clear as ClearIcon } from '@mui/icons-material';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    
    onAddTodo(trimmedTitle);
    setTitle('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: title && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setTitle('')}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'white',
              '&:hover': {
                bgcolor: '#fafafa',
              },
              '&.Mui-focused': {
                bgcolor: 'white',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          sx={{ 
            height: 56,
            px: 4,
            borderRadius: 3,
            fontSize: '1rem',
          }}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default TodoForm;