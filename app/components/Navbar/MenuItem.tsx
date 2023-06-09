"use client";

interface MenuItemProps {
  onClick: (e: React.MouseEvent) => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='px-4 py-3 
  hover:bg-neutral-100  transition font-semibold'
    >
      {label}
    </div>
  );
};

export default MenuItem;
