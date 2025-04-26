import MainInfoBlock from '../_components/divisions/main/main-info-block';
import BlockWrapper from '../_components/ui/block-wrapper';
import TabsSwitcher from '../_components/ui/tabs-switcher';

const EstablishmentCreationView = () => {
	return (
		<div className="full-height flex flex-col gap-7">
			<BlockWrapper>
				<TabsSwitcher />
			</BlockWrapper>
			<BlockWrapper>
				<MainInfoBlock />
			</BlockWrapper>
		</div>
	);
};

export default EstablishmentCreationView;
