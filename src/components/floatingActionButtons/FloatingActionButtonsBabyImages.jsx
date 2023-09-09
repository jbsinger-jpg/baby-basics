import PhotoIcon from '@mui/icons-material/Photo';

import FabTemplate from './StandardFab';
import ColorModeToggleButton from '../ColorModeToggleButton';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';

export default function FloatingActionButtonsBabyImages({ setBabyImagesModalIsOpen }) {
    return (
        <FloatingActionButtonContainer>
            <ColorModeToggleButton />
            <FabTemplate
                icon={<PhotoIcon fontSize="large" />}
                onClick={() => setBabyImagesModalIsOpen(true)}
                label={"Add more Pictures"}
            />
        </FloatingActionButtonContainer>
    );
}
