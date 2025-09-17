interface InfoCardProps {
  label: string;
  value: string;
  className: string;
}

const InfoCard = ({ label, value, className }: InfoCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 md:w-3 md:h-3  ${className} rounded-full`}></div>

      <p className="text-xs md:text-[14px] text-gray-500">
        <span className="text-sm md:text-[15px] text-black font-semibold">
          {value}
        </span>{" "}
        {label}
      </p>
    </div>
  );
};

export default InfoCard;
