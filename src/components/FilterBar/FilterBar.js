import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelectors } from 'redux/filter/filterSelectors';
import { filterActions } from 'redux/filter/filterSlice';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import styles from './FilterBar.module.scss';

const FilterBar = ({
    wrapperStyles = '',
    iconStyles = '',
    inputStyles = '',
    ...restProps
}) => {
    const dispatch = useDispatch();
    const filter = useSelector(filterSelectors.getFilter);

    return (
        <div
            className={ `${styles.wrapper} ${wrapperStyles}` }
        >
            <SearchIcon
                className={ `${styles.search_icon} ${iconStyles}` }
            />
            <input
                value={ filter }
                onChange={(e) => dispatch(filterActions.setFilter(e.target.value))}
                className={ `input ${styles.filter} ${inputStyles}` }
                {...restProps}
            />
        </div>
    )
}

FilterBar.propTypes = {
    wrapperStyles: PropTypes.string,
    iconStyles: PropTypes.string,
    inputStyles: PropTypes.string,
}

export default FilterBar;