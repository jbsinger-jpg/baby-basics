import FabTemplate from './StandardFab';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from '../ColorModeToggleButton';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';

export default function FloatingActionButtonsDiaperTracking({ setSearchBarIsOpen, setDrawerVisible }) {
    const navigate = useNavigate();

    return (
        <FloatingActionButtonContainer>
            <ColorModeToggleButton />
            <FabTemplate
                icon={<HomeIcon fontSize="large" />}
                onClick={() => navigate("/")}
                label={"Home"}
            />
            <FabTemplate
                icon={<SearchIcon height="30px" width="30px" />}
                onClick={() => setSearchBarIsOpen(true)}
                label={"Search"}
            />
            <FabTemplate
                label="Add Child"
                onClick={() => setDrawerVisible(true)}
                icon={<AddIcon fontSize="large" />}
            />
        </FloatingActionButtonContainer>
    );
}
