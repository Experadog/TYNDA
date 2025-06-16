'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { formatDate, priceFormatter } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { TariffListRetrievalResponseModel, UserCardRetrievalResponseModel } from '@/services';
import { TariffCard } from '@components';
import { CircleCheck } from 'lucide-react';
import { HiMinusSmall } from 'react-icons/hi2';

type Props = {
	other_tariffs: TariffListRetrievalResponseModel['data'];
	userCard: UserCardRetrievalResponseModel['data'];
};

const TariffsView = ({ other_tariffs, userCard }: Props) => {
	const { locale } = useLocale();
	const viewModel = useViewModel(['Shared']);

	const translation = userCard?.tariff.translates?.[locale];

	return (
		<div className="p-5 flex flex-col gap-12">
			<h3 className="text-foreground_1 text-2xl font-semibold">Текущий тариф</h3>
			<div className="flex flex-col max-w-[400px] w-full bg-background_6 p-3 rounded-2xl border border-light_gray gap-3 shadow-md">
				<div className="flex flex-col gap-2">
					<p className="text-lg  px-3 py-1 font-semibold text-yellow bg-background_1 rounded-2xl border border-light_gray w-max mx-auto">
						{translation.name}
					</p>
					<TariffCard isActive={userCard?.tariff?.status === 'enable'} data={userCard} />
				</div>

				<div className="flex flex-col  w-full bg-background_6 rounded-xl  border-light_gray border">
					{translation.description.map((feature, index) => (
						<div key={feature} className="flex flex-col">
							<div className="flex justify-between gap-2 items-center  p-3 ">
								<p className="font-roboto text-md font-normal text-foreground_1 gap-0.5 flex items-center">
									<HiMinusSmall className="text-foreground_1" />
									{feature}
								</p>
								<CircleCheck className="text-success" />
							</div>

							{index !== translation.description.length - 1 && (
								<div className="w-full h-[1px] bg-light_gray" />
							)}
						</div>
					))}
				</div>

				<div className="flex flex-col gap-3  bg-background_3  p-3 rounded-xl border border-light_gray ">
					<div className="flex  items-center justify-between font-roboto text-foreground_1 font-normal">
						<p>Статус</p>
						{viewModel.entity_status[userCard?.tariff.status]}
					</div>

					<div className="flex   items-center justify-between font-roboto text-foreground_1 font-normal">
						<p>Стоимость</p>
						<p>{priceFormatter(userCard?.tariff.price, 'с')}</p>
					</div>

					<div className="flex   items-center justify-between font-roboto text-foreground_1 font-normal">
						<p>Активен до</p>
						<p>{formatDate(userCard?.expire_date, { showTime: true })}</p>
					</div>
				</div>
			</div>
			<h3 className="text-foreground_1 text-2xl font-semibold">Все тарифы</h3>

			<div className="grid gap-5 grid-cols-4 sm:grid-cols-1 auto-rows-fr">
				{other_tariffs.items.map((item) => {
					const translation = item.translates?.[locale] || {
						name: '',
						description: [''],
					};

					return (
						<div
							key={item.id}
							className="flex flex-col justify-between bg-background_6 border border-light_gray rounded-2xl shadow-md p-6 gap-5 transition-transform duration-300 hover:-translate-y-[5px] cursor-pointer"
						>
							<div className="flex items-center justify-between">
								<p className="text-xl font-semibold text-foreground_1">
									{translation.name}
								</p>
								<div className="bg-background_3 text-yellow px-3 py-1 rounded-full text-sm font-medium border border-light_gray">
									{item.card_type}
								</div>
							</div>

							<div className="flex flex-col gap-3 flex-1">
								{translation.description.map((desc) => (
									<div
										key={`${desc}-${item.id}`}
										className="flex items-center gap-2 text-foreground_1"
									>
										<CircleCheck className="text-success w-5 h-5" />
										<p className="font-roboto text-md font-normal">{desc}</p>
									</div>
								))}
							</div>

							<div className="flex flex-col gap-2 border-t border-light_gray pt-4">
								<div className="flex justify-between items-center font-roboto text-foreground_1">
									<p>Стоимость</p>
									<p className="text-lg text-foreground_1">
										{priceFormatter(item.price, 'с')}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TariffsView;
