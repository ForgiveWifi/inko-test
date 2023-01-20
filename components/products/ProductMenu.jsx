import { Menu } from '@mantine/core';
import { BiTrash } from "react-icons/bi"
import { BiEdit } from "react-icons/bi"
import { HiDownload } from "react-icons/hi"
import MenuButton from '../ui/MenuButton';

function ProductMenu({edit}) {
  return (
    <>
      <Menu shadow="lg" width={200} position="bottom-end">
        <Menu.Target>
          <button className='flexbox white-background radius5' style={{ padding: "8px 8px"}}>
            <MenuButton />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item icon={<HiDownload style={{ fill: "rgb(107, 116, 130)"}}/>}>Download</Menu.Item>
          <Menu.Item onClick={edit} icon={<BiEdit style={{ fill: "rgb(107, 116, 130)"}}/>}>Edit</Menu.Item>
          <Menu.Item icon={<BiTrash style={{ fill: "rgb(253, 81, 81)" }}/>} >
            <div style={{ color: "rgb(253, 81, 81)"}}>Delete Tag</div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default ProductMenu;