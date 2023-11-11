import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  InboxIcon,
  PaperClipIcon,
  PlusIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const options = [
  {
    label: "Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Orders",
    icon: PaperClipIcon,
  },
  {
    label: "Add Product Item",
    icon: PlusIcon,
  },
  {
    label: "Product Items",
    icon: InboxIcon,
  },

  {
    label: "Logout",
    icon: PowerIcon,
  },
];
function SideBar({ mode, setMode }) {
  return (
    <div className="max-w-[20rem] p-4 border-[1px] border-r-blue-gray-100">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          User Dashboard
        </Typography>
      </div>
      <List>
        {options.map((item) => {
          return (
            <ListItem onClick={() => setMode(item.label)} key={item.label}>
              <ListItemPrefix>
                <item.icon className="h-5 w-5" />
              </ListItemPrefix>
              {item.label}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default SideBar;
