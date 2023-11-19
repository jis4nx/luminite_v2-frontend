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
import { useEffect, useState } from "react";

export function SearchProduct({ items, handleClickProduct, query }) {
  const [mount, setMount] = useState(false);
  const [product, setProducts] = useState([]);
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/product/${id}`);
    handleClickProduct();
  };
  useEffect(() => {
    if (items !== undefined) {
      setMount(true);
      setProducts(items.items);
    }
  }, [items]);
  useEffect(() => {
    console.log(product);
  }, [product]);
  return mount && (
    <Card className="mt-2 absolute w-[28%]">
      {product.length
        ? (
          <List>
            {product.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  <ListItemPrefix>
                    <Image
                      alt={item.name}
                      src={item.image}
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
