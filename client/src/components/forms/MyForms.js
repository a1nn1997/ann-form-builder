import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMyForms } from '../../actions/form'
import FormItem from './FormItem'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MyForms = ({ auth: { user }, forms, getMyForms }) => {
  useEffect(() => {
    getMyForms()
  }, [getMyForms])

  const handleEnd = (result) => {
    console.log(result);
    if (!result.destination) return; //if no destination exits(cancel event), exit this function
    const items = Array.from(forms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    getMyForms(items);
  };

  return (
    <Fragment>
      <h1>Created Forms By: {user && user.fullName}</h1>
      <div>
      <DragDropContext onDragEnd={handleEnd}>
<Droppable droppableId="to-dos">
  {(provided) => (
    <ul {...provided.droppableProps} ref={provided.innerRef}>
          } {forms.map((item, index) => (
         
            <Draggable
              key={item._id}
              draggableId={item._id.toString()}
              item={item}
              index={index}
            >
              
              {(provided, snapshot) => (
                <li
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  key={item._id}
                  className={
                    snapshot.isDragging ? "selected" : "not-selected"
                  }
                >
                  <FormItem form={item} />
                </li>
              )}
            </Draggable>
            ))}
                  
                
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
      </div>
    </Fragment>
  )
}

MyForms.propTypes = {
  getMyForms: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  forms: state.form.forms,
  auth: state.auth
})

export default connect(mapStateToProps, { getMyForms })(MyForms)
