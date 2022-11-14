import React from 'react';
import { Link as LinkBack } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';


export const BackButton = (props:{color: any}) => (
    <Link 
        to="/"
        underline="none"
        component={LinkBack}
    >
        <Button
            variant="text"
            color= {props.color ? props.color : "secondary"}
            startIcon={<ArrowBackIos />}
            style={{ textTransform: 'capitalize'}}
        >
            Назад
        </Button>
    </Link>
);

