'use client';

import type { EstablishmentDetailed } from '@business-entities';
import type { EstablishmentFormValues } from '@common';
import { Form } from '@components';

import { useUser } from '@/providers/user/user-provider';
import { useEstablishmentContext } from '../../use-case/establishment-context-provider';
import { useEstablishmentSchemaUseCase } from '../../use-case/other/useEstablishmentSchemaUseCase';
import { useCreationUseCase } from '../../use-case/stories/useCreationUseCase';
import { useUpdatingUseCase } from '../../use-case/stories/useUpdatingUseCase';
import ContactsBlock from './_components/blocks/contacts-block';
import EstablisherBlock from './_components/blocks/establisher-block';
import FooterBlock from './_components/blocks/footer-block';
import GeolocationBlock from './_components/blocks/geolocation-block';
import ImagesBlock from './_components/blocks/images-block';
import MainInfoBlock from './_components/blocks/main-info-block';
import BlockWrapper from './_components/ui/block-wrapper';

type Props = {
	establishment?: EstablishmentDetailed;
};

const EstablishmentForm = ({ establishment }: Props) => {
	const { user } = useUser();

	const { viewModel, pagination } = useEstablishmentContext();

	const updatingUseCase = useUpdatingUseCase({
		viewModel: {
			updating: viewModel.Toast.EstablishmentUpdating,
			loadFile: viewModel.Toast.LoadFile,
			loadFileValidation: viewModel.CommonToast.too_large_image,
		},
		refetchPagination: pagination.actions.refetchCurrentPage,
	});

	const creationUseCase = useCreationUseCase({
		viewModel: {
			creation: viewModel.Toast.EstablishmentCreation,
			loadFile: viewModel.Toast.LoadFile,
			loadFileValidation: viewModel.CommonToast.too_large_image,
		},
	});

	const { schema, setShouldValidateEstablisherID } = useEstablishmentSchemaUseCase({
		defaultValue: establishment,
		viewModel: viewModel.Validation,
	});

	const onSubmit = async (values: EstablishmentFormValues) => {
		if (establishment?.id) {
			await updatingUseCase.onSubmit(values, establishment.id);
		} else {
			await creationUseCase.onSubmit(values);
		}
	};

	return (
		<div className="flex flex-col gap-7 min-w-0">
			<Form {...schema}>
				<form
					className="w-full flex flex-col gap-4"
					onSubmit={schema.handleSubmit(onSubmit)}
				>
					<BlockWrapper>
						<MainInfoBlock
							schema={schema}
							categoriesViewModel={viewModel.Shared.establishment_categories}
						/>
					</BlockWrapper>

					<BlockWrapper>
						<ImagesBlock schema={schema} />
					</BlockWrapper>

					<BlockWrapper>
						<GeolocationBlock schema={schema} />
					</BlockWrapper>

					{user?.is_superuser && !establishment && (
						<BlockWrapper>
							<EstablisherBlock
								schema={schema}
								onChangeEstIdValidation={(should) =>
									setShouldValidateEstablisherID(should)
								}
							/>
						</BlockWrapper>
					)}

					<BlockWrapper>
						<ContactsBlock schema={schema} />
					</BlockWrapper>

					<BlockWrapper>
						<FooterBlock
							isUpdatingMode={!!establishment?.id}
							schema={schema}
							establishment={establishment}
						/>
					</BlockWrapper>
				</form>
			</Form>
		</div>
	);
};

export default EstablishmentForm;
