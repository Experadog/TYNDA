'use client';
import CustomMap from '@/components/map/CustomMap';
import type { FC } from 'react';

interface IProps {
	address: ViewModel['Contacts']['address'];
}

const Address: FC<IProps> = ({ address }) => {
	return (
		<div className="mt-[100px] lg:mt-[60px] flex flex-col items-center gap-12 lg:gap-7">
			<div className="flex flex-col items-center justify-center gap-5">
				<h3 className="uppercase text-lg lg:text-base font-semibold ">
					{address.ourAddress}
				</h3>
				<p className="text-4xl lg:text-2xl">{address.onMap}</p>
			</div>
			<div className="w-full h-[350px] rounded-xl overflow-hidden sm:h-[300px]">
				<CustomMap
					defaultMarkerCoordinates={[42.867816, 74.611597]}
					protectedScroll
					defaultPosition={[42.867816, 74.611597]}
					isStaticMark
					isSearch={false}
					zoom={30}
				/>
			</div>
		</div>
	);
};

export default Address;
