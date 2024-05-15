export default function Review({review}) {
	return (
        <div className="cool-card max-w-[540px] w-full">
			<div className="top flex items-center justify-between mb-2">
				<span className="text-lg text-secondary font-semibold">★ {review.rating} / 5</span>
				<span className="text-secondary ">{review.room}</span>
			</div>
            <p>{review.text}</p>
        </div>
    )
}