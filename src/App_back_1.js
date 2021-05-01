import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const SortingExample = () => {

	const [state, setState] = useState({
		items: [
			{
				id: '4',
				content: 4
			},
			{
				id: '11',
				content: 11
			},
			{
				id: '7',
				content: 7
			},
			{
				id: '5',
				content: 5
			},
			{
				id: '16',
				content: 16
			},
		],
	});

	// a little function to help us with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const grid = 8;

	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		padding: grid * 2,
		margin: `0 ${grid}px 0 0`,

		// change background colour if dragging
		background: isDragging ? 'lightgreen' : 'grey',

		// styles we need to apply on draggables
		...draggableStyle,
	});

	const getListStyle = isDraggingOver => ({
		background: isDraggingOver ? 'lightblue' : 'lightgrey',
		display: 'flex',
		padding: grid,
		overflow: 'auto',
	});

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			state.items,
			result.source.index,
			result.destination.index
		);

		setState({
			items,
		});
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
						{...provided.droppableProps}
					>
						{state.items.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
									>
										{item.content}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}


export default SortingExample;