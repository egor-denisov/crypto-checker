import React from 'react'
import ChevronDownSVG from '../../svg/ChevronDown'
import ChevronUpSVG from '../../svg/ChevronUp'
const TitleOfTableOfCoins = ({
	typeOfSorting,
	setTypeOfSorting,
	sortingDirection,
	setSortingDirection
}: {
	typeOfSorting: string
	setTypeOfSorting: Function
	sortingDirection: string
	setSortingDirection: Function
}) => {
	const changeSortingByDblClick = (e: any, newTypeOfSorting: string) => {
		if (e.detail === 2) {
			typeOfSorting !== newTypeOfSorting
				? setTypeOfSorting(newTypeOfSorting)
				: setSortingDirection(
						sortingDirection === 'ascending'
							? 'descending'
							: 'ascending'
				  )
		}
	}
	const getDirection = (
		name: string,
		typeOfSorting: string,
		sortingDirection: string
	) => {
		if (name === typeOfSorting) {
			switch (sortingDirection) {
				case 'descending':
					return <ChevronDownSVG />
				case 'ascending':
					return <ChevronUpSVG />
				default:
					return <div></div>
			}
		}
	}
	return (
		<div className="title-of-table-of-coins">
			<div
				className="title-name"
				onClick={(e) => changeSortingByDblClick(e, 'name')}
				title="Double Click to enable sorting by name"
			>
				Name{getDirection('name', typeOfSorting, sortingDirection)}
			</div>
			<div
				className="title-price"
				onClick={(e) => changeSortingByDblClick(e, 'price')}
				title="Double Click to enable sorting by price"
			>
				Price{getDirection('price', typeOfSorting, sortingDirection)}
			</div>
			<div
				className="title-change"
				onClick={(e) => changeSortingByDblClick(e, 'change')}
				title="Double Click to enable sorting by change"
			>
				Change 24h
				{getDirection('change', typeOfSorting, sortingDirection)}
			</div>
			<div
				className="title-marketCap"
				onClick={(e) => changeSortingByDblClick(e, 'capitalization')}
				title="Double Click to enable sorting by market cap"
			>
				Market Cap
				{getDirection(
					'capitalization',
					typeOfSorting,
					sortingDirection
				)}
			</div>
			<div
				className="title-totalVolume"
				onClick={(e) => changeSortingByDblClick(e, 'volume24h')}
				title="Double Click to enable sorting by volume"
			>
				Volume 24h
				{getDirection('volume24h', typeOfSorting, sortingDirection)}
			</div>
			<div></div>
		</div>
	)
}

export default TitleOfTableOfCoins
