import React, {Component} from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import swal from "sweetalert2";
import T from "i18n-react/dist/i18n-react";
import './SearchBar.scss';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.skipToggle = false;
        this.state = {
            isOpenDropDown: false,
            currentSelectedItem: null,
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.onClickPrimaryAction = this.onClickPrimaryAction.bind(this);
        this.lostFocus = this.lostFocus.bind(this);
        this.gotFocus  = this.gotFocus.bind(this);

    }

    lostFocus(event){
        window.setTimeout(() => {
            if(this.state.isOpenDropDown)
                this.setState({ ...this.state,
                    isOpenDropDown: false
                });
        }, 300);
    }

    gotFocus(){
        if(this.props.currentItems == null || this.props.currentItems.length == 0){
            return;
        }
        this.setState({ ...this.state,
            isOpenDropDown: true
        });
    }

    toggleDropDown() {
        if(this.skipToggle){
            this.skipToggle = false;
            return;
        }
        if(this.props.currentItems != null || this.props.currentItems.length == 0){
            return;
        }
        this.setState({ ...this.state,
            isOpenDropDown: !this.state.isOpenDropDown
        });
    }

    onClickPrimaryAction(event){
        event.preventDefault();
        if(this.state.currentSelectedItem == null){
            swal(
                T.translate("Error"),
                T.translate("Must select first an item!"),
                "error"
            );
            return;
        }
        this.props.onClickPrimaryAction(this.state.currentSelectedItem);
        this.setState({ ...this.state,
            currentSelectedItem: null,
            isOpenDropDown: false,
        });
        let input = document.getElementById(`search_term_${this.props.searchId}`);
        if(input == null) return;
        input.value = '';
    }

    onSelectedItem(item){
        let input =  document.getElementById(`search_term_${this.props.searchId}`);
        if(input == null) return;
        input.value = this.props.getDisplayName(item);
        this.skipToggle = true;
        this.setState({ ...this.state,
            currentSelectedItem: item,
            isOpenDropDown: false,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.currentItems.length > 0 && prevProps.currentItems.length !=  this.props.currentItems.length){
            this.setState({ ...this.state,
                isOpenDropDown: true,
            });
        }
    }

    onChangeSearchInput(event){
        let { value } = event.target;
        let { isOpenDropDown } = this.state;

        this.props.handleChangeSearchTerm(value);

        if(value == ''){
            isOpenDropDown = false;
        }

        this.setState({ ...this.state,
            currentSelectedDevice: null,
            isOpenDropDown: isOpenDropDown,
        });
    }

    render(){
        let { currentItems,
            getDisplayName,
            searchPlaceHolder,
            primaryActionClass,
            primaryActionName,
            useSecondaryAction,
            secondaryActionClass,
            secondaryActionName,
            onClickSecondaryAction,
            searchId } = this.props;

        let md1 = useSecondaryAction ? "4" : "12";
        let md2 = useSecondaryAction ? "3" : "12";
        return(
            <Row className="search-container">
                <Col xs="12" md={md1}>
                    <ButtonDropdown className="dropdown-add" isOpen={this.state.isOpenDropDown} toggle={() => {
                        this.toggleDropDown();}}>
                        <DropdownToggle>
                        </DropdownToggle>
                        <Input type="text" onChange={this.onChangeSearchInput}
                               id={`search_term_${searchId}`}
                               name={`search_term_${searchId}`}
                               placeholder={searchPlaceHolder}
                               onBlur={this.lostFocus}
                               onFocus={this.gotFocus}
                        />
                        <DropdownMenu>
                            { currentItems.map((item, i) => {

                                return (
                                    <DropdownItem key={item.id} onClick={ () => this.onSelectedItem(item)}>{getDisplayName(item)}</DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
                <Col xs="12" md={md2}>
                    <Button onClick={this.onClickPrimaryAction} color="primary" className={primaryActionClass}><i className="fa fa-link"></i>{'\u00A0'} {primaryActionName}</Button>
                </Col>
                {useSecondaryAction &&
                <Col xs="12" sm="4" lg="3">

                    <Button onClick={onClickSecondaryAction} className={secondaryActionClass} color="primary">
                        <i className="fa fa-plus-circle"></i>{'\u00A0'} {secondaryActionName}
                    </Button>

                </Col>
                }
            </Row>
        );
    }
}

export default SearchBar;