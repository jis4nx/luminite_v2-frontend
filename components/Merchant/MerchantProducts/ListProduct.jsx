import { getMerchantProductList } from "@hooks/merchantProducts";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ProductChangeModal from "./ProductChangeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faList, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TABLE_HEAD = ["Name", "Category", "Base Price", "Total Items", "", ""];

export default function ListProducts() {
  const [queryName, setQueryName] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productData, setProductData] = useState({});
  const { data: listProducts } = getMerchantProductList(queryName);
  const handleSearch = (value) => {
    setQueryName(value);
  };

  return (
    <Card className="h-full w-full">
      {modalOpen
        ? (
          <ProductChangeModal
            productData={productData}
            open={modalOpen}
            setOpen={setModalOpen}
          />
        )
        : null}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 p-3">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product list
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search Name"
              color="black"
              value={queryName}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-site-blue p-4"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listProducts?.map(
              (
                { id, name, category, base_price, total_items, desc },
                index,
              ) => {
                const isLast = index === listProducts.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {category.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {base_price}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Link
                        href={`/merchant/products/${id}`}
                        className="font-medium flex gap-2 items-center text-site-blue"
                      >
                        {total_items}
                        <FontAwesomeIcon icon={faList} size="sm" />
                      </Link>
                    </td>

                    <td
                      className={`${classes} bg-blue-gray-50/50`}
                      onClick={() => {
                        setModalOpen(true);
                        setProductData({
                          id: id,
                          name: name,
                          base_price: base_price,
                          category: category,
                          desc: desc,
                        });
                      }}
                    >
                      <Typography
                        variant="small"
                        className="font-medium text-site-blue flex gap-2 items-center cursor-pointer"
                      >
                        Edit
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                        />
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
