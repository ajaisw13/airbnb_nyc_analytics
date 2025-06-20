import { SxProps, Theme } from '@mui/material/styles';

export const tableCellHeaderStyle: SxProps<Theme> = {
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
}

export const tableCellStyle: SxProps<Theme> = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}
