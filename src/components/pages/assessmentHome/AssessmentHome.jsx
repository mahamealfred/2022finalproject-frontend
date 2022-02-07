import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

export default function AssessmentHome() {
  return (
    <>
    <Stack direction="row" spacing={2}>
    
      <Button>
      <Link to="/assessment/studentLogin" >
        Primary
        </Link>
        </Button>
    
    </Stack>

    </>
  )
}
