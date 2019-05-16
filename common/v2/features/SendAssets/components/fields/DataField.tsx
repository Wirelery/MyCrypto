import React, { ChangeEvent, Component } from 'react';
import { Field, FieldProps } from 'formik';
import { TransactionFields, SendState } from '../../SendAssets';
import { Input } from '@mycrypto/ui';
//import { donationAddressMap } from '';

interface OwnProps {
  values: SendState;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  updateState(values: SendState): void;
}

/*interface StateProps {
  name: string;
}*/

type Props = OwnProps; // & StateProps;

export default class DataField extends Component<Props> {
  public isValidDataInput = () => {
    const valid = true;
    this.setState({ isValidDataInput: valid });
    return valid;
  };

  public handleDataField = (e: ChangeEvent<any>) => {
    const { values } = this.props;
    this.props.updateState({
      ...values,
      rawTransactionValues: {
        ...values.rawTransactionValues,
        data: e.target.value
      }
    });
    // Conduct estimateGas
    // Conduct clearFields
    this.props.handleChange(e);
  };

  public render() {
    //const { handleChange } = this.props;
    return (
      <Field
        name="data"
        validate={this.isValidDataInput}
        render={({ field }: FieldProps<TransactionFields>) => (
          <Input
            {...field}
            maxLength={10}
            value={field.value}
            onChange={this.handleDataField}
            placeholder="0x4bbeEB066eD09B7AEd07bF39EEe0460DFa261520"
            className="SendAssetsForm-fieldset-input"
          />
        )}
      />
    );
  }
}