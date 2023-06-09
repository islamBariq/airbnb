"use client";
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "this property is close to the beach !",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "this property has windmills",
  },
  {
    label: "modern",
    icon: MdOutlineVilla,
    description: "this property is modern",
  },
];
const Categories = () => {
  return (
    <Container>
      <div
        className='pt-4 flex flex-row items-center
       justify-between overflow-x-auto'
      >
        {categories.map((item) => (
          <CategoryBox key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
