import React from 'react'
import { BtnColors } from "./BtnColors";
import { faPlus, 
    faPencil, 
    faTrashCan, 
    faAngleDown, 
    faAngleUp, 
    faPaperPlane, 
    faGripVertical, 
    faMagnifyingGlass,
    faCloudArrowDown,
    faCloudArrowUp,
    faArrowLeftLong,
    faArrowRightLong,
    faXmark,
    faCheck,
    faFileExport } from '@fortawesome/free-solid-svg-icons'
    import {  } from '@fortawesome/free-regular-svg-icons'
    import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
    import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
    import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
    import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
    import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
    import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
    import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
    import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
    import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
    import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
    import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
    import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
    import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
    import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//<FontAwesomeIcon icon={icon.icon} />
export const MuiBtnType = {
    Add: {icon: <FontAwesomeIcon icon={faPlus} />, color: BtnColors.green},
    Edit: {icon: <FontAwesomeIcon icon={faPencil} />, color: BtnColors.blue},
    Delete: {icon: <FontAwesomeIcon icon={faTrashCan} />, color: BtnColors.red},   
    ArrowDown: {icon: <FontAwesomeIcon icon={faAngleDown} />, color: BtnColors.transparent},
    ArrowUp: {icon: <FontAwesomeIcon icon={faAngleUp} />, color: BtnColors.transparent},
    Send: {icon: <FontAwesomeIcon icon={faPaperPlane} />, color: BtnColors.blue},
    DragAndDrop: {icon: <FontAwesomeIcon icon={faGripVertical} />, color: BtnColors.transparent},
    Search: {icon: <FontAwesomeIcon icon={faMagnifyingGlass} />, color: BtnColors.green},
    Download: {icon: <FontAwesomeIcon icon={faCloudArrowDown} />, color: BtnColors.blue},
    Upload: {icon: <FontAwesomeIcon icon={faCloudArrowUp} />, color: BtnColors.blue},
    Cancel: {icon: null, color: BtnColors.lightBlue},
    Submit: {icon: null, color: BtnColors.blue},
    SubmitAndNew: {icon: null, color: BtnColors.green},
    DeleteWithoutIcon: {icon: null, color: BtnColors.red},
    ArrowBack: {icon: <FontAwesomeIcon icon={faArrowLeftLong} />, color: BtnColors.transparent},
    ArrowRight: {icon: <FontAwesomeIcon icon={faArrowRightLong} />, color: BtnColors.transparent},
    Yes: {icon: <FontAwesomeIcon icon={faCheck} />, color: BtnColors.inverseGreen},
    No: {icon: <FontAwesomeIcon icon={faXmark} />, color: BtnColors.inverseRed},
    Copy: {icon: <FontAwesomeIcon icon={faFileExport} />, color: BtnColors.orange}
}