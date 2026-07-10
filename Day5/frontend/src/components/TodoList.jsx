// src/components/TodoList.jsx
import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Box,
  Chip,
  Tooltip,
  Fade
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  CircleOutlined as CircleOutlinedIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
          No tasks yet
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add your first task above to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ overflow: 'hidden' }}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {todos.map((todo, index) => (
          <Fade in={true} timeout={300} key={todo._id}>
            <ListItem
              sx={{
                borderBottom: index < todos.length - 1 ? '1px solid #f0f0f0' : 'none',
                '&:hover': {
                  bgcolor: '#f9f9f9',
                  transition: 'background-color 0.2s',
                },
                transition: 'all 0.2s ease',
                py: 2,
              }}
            >
              <ListItemIcon>
                <Checkbox
                  icon={<CircleOutlinedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={todo.is_completed}
                  onChange={() => onToggleTodo(todo._id, !todo.is_completed)}
                  color="primary"
                  sx={{
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                />
              </ListItemIcon>
              
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: todo.is_completed ? 'line-through' : 'none',
                      color: todo.is_completed ? 'text.secondary' : 'text.primary',
                      fontWeight: todo.is_completed ? 400 : 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    {todo.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="textSecondary">
                      {new Date(todo.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                    {todo.is_completed && (
                      <Chip 
                        label="Completed" 
                        size="small" 
                        color="success" 
                        variant="outlined"
                        sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                }
              />
              
              <ListItemSecondaryAction>
                <Tooltip title="Delete task" placement="top">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDeleteTodo(todo._id)}
                    color="error"
                    sx={{
                      '&:hover': {
                        bgcolor: '#ffebee',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Fade>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;