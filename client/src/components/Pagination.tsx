import React from 'react'
import { Paginationtype } from '../types/CoinRatesTypes'
import ChevronRightSVG from '../svg/ChevronRight'
import ChevronLeftSVG from '../svg/ChevronLeft'
import { uniteClasses } from '../utils/helper'
const getPagination = (pagination: Paginationtype, setPagination: Function) => {
	if (pagination.countOfPages <= 9) {
		return Array(pagination.countOfPages)
			.fill(null)
			.map((v, key) => (
				<div
					className={uniteClasses([
						'page',
						key === pagination.page && 'active'
					])}
					key={key}
					onClick={() => setPagination({ ...pagination, page: key })}
				>
					{key + 1}
					<hr />
				</div>
			))
	} else {
		switch (true) {
			case pagination.page < 6:
				return (
					<>
						{Array(7)
							.fill(null)
							.map((v, key) => (
								<div
									className={uniteClasses([
										'page',
										key === pagination.page && 'active'
									])}
									key={key}
									onClick={() =>
										setPagination({
											...pagination,
											page: key
										})
									}
								>
									{key + 1}
									<hr />
								</div>
							))}
						<div className="page">...</div>
						<div
							className="page"
							onClick={() =>
								setPagination({
									...pagination,
									page: pagination.countOfPages - 1
								})
							}
						>
							{pagination.countOfPages}
							<hr />
						</div>
					</>
				)
			case pagination.page > pagination.countOfPages - 7:
				return (
					<>
						<div
							className="page"
							onClick={() =>
								setPagination({ ...pagination, page: 0 })
							}
						>
							1<hr />
						</div>
						<div className="page">...</div>
						{Array(7)
							.fill(pagination.countOfPages - 7)
							.map((v, key) => (
								<div
									className={uniteClasses([
										'page',
										v + key === pagination.page && 'active'
									])}
									key={key}
									onClick={() =>
										setPagination({
											...pagination,
											page: v + key
										})
									}
								>
									{v + key + 1}
									<hr />
								</div>
							))}
					</>
				)
			default:
				return (
					<>
						<div
							className="page"
							onClick={() =>
								setPagination({ ...pagination, page: 0 })
							}
						>
							1<hr />
						</div>
						<div className="page">...</div>
						{Array(5)
							.fill(pagination.page - 2)
							.map((v, key) => (
								<div
									className={uniteClasses([
										'page',
										v + key === pagination.page && 'active'
									])}
									key={v + key}
									onClick={() =>
										setPagination({
											...pagination,
											page: v + key
										})
									}
								>
									{v + key + 1}
									<hr />
								</div>
							))}
						<div className="page">...</div>
						<div
							className="page"
							onClick={() =>
								setPagination({
									...pagination,
									page: pagination.countOfPages - 1
								})
							}
						>
							{pagination.countOfPages}
							<hr />
						</div>
					</>
				)
		}
	}
}
const Pagination = ({
	pagination,
	setPagination
}: {
	pagination: Paginationtype
	setPagination: Function
}) => {
	return (
		<div className="pagination-page">
			<div className="select-page">
				<div
					className={uniteClasses([
						'navigator-bottom',
						pagination.page === 0 && 'disabled'
					])}
					onClick={() =>
						setPagination({
							...pagination,
							page:
								pagination.page === 0
									? pagination.page
									: pagination.page - 1
						})
					}
				>
					<ChevronLeftSVG />
				</div>
				{getPagination(pagination, setPagination)}
				<div
					className={uniteClasses([
						'navigator-bottom',
						pagination.page === pagination.countOfPages - 1 &&
							'disabled'
					])}
					onClick={() =>
						setPagination({
							...pagination,
							page:
								pagination.page === pagination.countOfPages - 1
									? pagination.page
									: pagination.page + 1
						})
					}
				>
					<ChevronRightSVG />
				</div>
			</div>
			{/* <div className="select-limit">
                <p>Show:</p>
                <MyNumber value={pagination.limit} max={coins.size} changeNumber={(newLimit: number)=>{setPagination({...pagination, limit: newLimit})}}/>
            </div> */}
		</div>
	)
}

export default Pagination
