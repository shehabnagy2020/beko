import React from "react";
import Card from "@/components/Card";
import Image from "next/image";

const EmptyCard = () => {
  return (
    <Card className="justify-center items-center space-y-5">
      <div className="">
        <Image src={"/images/no-data.png"} width={350} height={350} />
      </div>
      <span className="text-xl font-bold mb-10">لا توجد بيانات</span>
    </Card>
  );
};

export default EmptyCard;
