import BASE_URL from "@app/data";
import Image from "next/image";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import EmptyProductList from "@components/NotFound/EmptyProductList";

export function SearchProduct({ items, handleClickProduct, query }) {
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/product/${id}`);
    handleClickProduct();
  };
  return (
    <Card className="mt-2 absolute w-[28%]">
      {items && items.length && query
        ? (
          <List>
            {items.map((item) => {
              return (
                <ListItem
                  key={item.item.id}
                  onClick={() => {
                    handleClick(item.item.id);
                  }}
                >
                  <ListItemPrefix>
                    <Image
                      alt={item.name}
                      src={`${BASE_URL}${item.item.image}`}
                      width={50}
                      height={50}
                    />
                  </ListItemPrefix>
                  <Typography variant="h6" color="blue-gray">
                    {item.name}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        )
        : query && (
          <div className="mx-auto p-10">
            <EmptyProductList />
          </div>
        )}
    </Card>
  );
}
