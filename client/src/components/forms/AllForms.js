import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getForms } from '../../actions/form'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AllForms = ({ forms, getForms }) => {
  useEffect(() => {
    getForms()
  }, [getForms])

  const handleEnd = (result) => {
    if (!result.destination) return; //if no destination exits(cancel event), exit this function
    const items = Array.from(forms);
    console.log(items)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    getForms(items);
  };

  return (
    <Fragment>
      <h1>All Created Forms:</h1>
      <div>
      <DragDropContext onDragEnd={handleEnd}>
    <Droppable droppableId="to-dos">
      {(provided) => (
        <ul  {...provided.droppableProps} ref={provided.innerRef}>
              } {forms && forms.map((item, index) => (
             
                <Draggable
                  key={item._id}
                  draggableId={item._id.toString()}
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
                      
            <Link to={`/forms/${item._id}`}>
              <h5>{index + 1}.{item.title}</h5>
              
            </Link>
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

AllForms.propTypes = {
  getForms: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  forms: state.form.forms
})

export default connect(mapStateToProps, { getForms })(AllForms)
