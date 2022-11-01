import React from 'react';
import { Button, Grid } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useCanvas } from '@/hooks/useCanvas';

const CanvasComponent = () => {
    const [canvasRef, isRefreshed, setRefreshed] = useCanvas();

    const handleRefreshCanvas = () => {
        setRefreshed(!isRefreshed);
    };

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="column"
        >
            <Grid item xs={12}>
                <canvas ref={canvasRef} width={736} height={472} />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleRefreshCanvas}
                    startIcon={<ReplayIcon />}
                >
                    Играть еще раз
                </Button>
            </Grid>
        </Grid>
    );
};

export default CanvasComponent;
