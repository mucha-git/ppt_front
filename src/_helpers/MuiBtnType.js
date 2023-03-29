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
    faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

export const MuiBtnType = {
    Add: {icon: faPlus, color: BtnColors.green},
    Edit: {icon: faPencil, color: BtnColors.blue},
    Delete: {icon: faTrashCan, color: BtnColors.red},   
    ArrowDown: {icon: faAngleDown, color: BtnColors.transparent},
    ArrowUp: {icon: faAngleUp, color: BtnColors.transparent},
    Send: {icon: faPaperPlane, color: BtnColors.blue},
    DragAndDrop: {icon: faGripVertical, color: BtnColors.transparent},
    Search: {icon: faMagnifyingGlass, color: BtnColors.green},
    Download: {icon: faCloudArrowDown, color: BtnColors.orange},
    Upload: {icon: faCloudArrowUp, color: BtnColors.blue},
    Cancel: {icon: null, color: BtnColors.transparent},
    Submit: {icon: null, color: BtnColors.blue},
    SubmitAndNew: {icon: null, color: BtnColors.green},
    DeleteWithoutIcon: {icon: null, color: BtnColors.red},
    ArrowBack: {icon: faArrowLeftLong, color: BtnColors.transparent}
}