import { Component, OnInit, ViewChild } from "@angular/core";
import { DataFormValidationMode } from "nativescript-ui-dataform";
import { User } from "../../data-services/user";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { SegmentedBarItem, SelectedIndexChangedEventData } from "tns-core-modules/ui/segmented-bar";

@Component({
    moduleId: module.id,
    selector: "tk-dataform-validation-modes",
    templateUrl: "dataform-validation-modes.component.html"
})
export class DataFormValidationModesComponent implements OnInit {
    private _user: User;
    private _text: string;
    private _validationMode;
    private _isEnabled: boolean;
    private _segmentedBarItems: Array<SegmentedBarItem>;

    constructor() {
    }

    ngOnInit() {
        this._user = new User();
        const items = new Array<SegmentedBarItem>();
        const item1 = new SegmentedBarItem();
        item1.title = "immediate";
        items.push(item1);
        const item2 = new SegmentedBarItem();
        item2.title = "lost focus";
        items.push(item2);
        const item3 = new SegmentedBarItem();
        item3.title = "manual";
        items.push(item3);
        this._segmentedBarItems = items;
    }

    @ViewChild('myValidationModesDataForm', { static: false }) myValidateDataFormComp: RadDataFormComponent;

    get user(): User {
        return this._user;
    }

    get validationMode() {
        return this._validationMode;
    }

    get segmentedBarItems() {
        return this._segmentedBarItems;
    }

    get isEnabled() {
        return this._isEnabled;
    }

    get text() {
        return this._text;
    }

    public onSelectedIndexChanged(eventData: SelectedIndexChangedEventData) {
        switch (eventData.newIndex) {
            case 0:
                this._validationMode = DataFormValidationMode.Immediate;
                this._isEnabled = false;
                break;
            case 1:
                this._validationMode = DataFormValidationMode.OnLostFocus;
                this._isEnabled = false;
                break;
            case 2:
                this._validationMode = DataFormValidationMode.Manual;
                this._isEnabled = true;
                break;
        }
    }

    public onTap() {
// >> angular-dataform-validate-all
        this.myValidateDataFormComp.dataForm.validateAll()
            .then(result => {
                this.updateTextWithResult(result);
            });
// << angular-dataform-validate-all
    }

    public updateTextWithResult(validationResult) {
        const validatedValue = "username: " + this.myValidateDataFormComp.dataForm.getPropertyByName("username").valueCandidate +
            " password: " + this.myValidateDataFormComp.dataForm.getPropertyByName("password").valueCandidate +
            " email: " + this.myValidateDataFormComp.dataForm.getPropertyByName("email").valueCandidate;

        this._text = "Validated!" + "\n" +
            "PropertyName: " + "ALL" + "\n" +
            "Value: " + validatedValue + "\n" +
            "Result: " + validationResult;
    }

    public updateText(propertyName, validatedValue, validationResult) {
        this._text = null;
        this._text = "Validated!" + "\n" +
            "PropertyName: " + propertyName + "\n" +
            "Value: " + validatedValue + "\n" +
            "Result: " + validationResult;
    }

    public onPropertyValidated(args) {
        const propertyName = args.propertyName;
        const validatedValue = args.entityProperty.valueCandidate;
        const validationResult = args.entityProperty.isValid;

        this.updateText(propertyName, validatedValue, validationResult);
    }
}